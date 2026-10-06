import { LOGO_MARK_PATH } from "@openfutures/ui/logo";
function loadFontCss() {
  window.__ofFontCss ||= fetch(
    "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
  )
    .then((response) => response.text())
    .then((cssText) => {
      const fontFaces = cssText
        .split("@font-face")
        .slice(1)
        .map((block) => "@font-face" + block.split("}")[0] + "}")
        .filter((block) => /U\+0000-00FF/.test(block));
      return Promise.all(
        fontFaces.map((fontFace) => {
          const urlMatch = fontFace.match(/url\(([^)]+)\)/);
          if (urlMatch) {
            return fetch(urlMatch[1])
              .then((response) => response.blob())
              .then(
                (blob) =>
                  new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      resolve(fontFace.replace(urlMatch[1], reader.result as string));
                    };
                    reader.onerror = () => {
                      resolve("");
                    };
                    reader.readAsDataURL(blob);
                  }),
              )
              .catch(() => "");
          } else {
            return fontFace;
          }
        }),
      ).then((faces) =>
        faces.join(`
`),
      );
    })
    .catch(() => "");
  return window.__ofFontCss;
}
export function saveNodeSnapshot(node: any, filename: any, saveApi: any, onDone: any) {
  try {
    const themeRoot = node.closest(".app") || document.body;
    const themeStyle = getComputedStyle(themeRoot);
    const surfaceColor = themeStyle.getPropertyValue("--surface").trim() || "#161616";
    const textColor = themeStyle.getPropertyValue("--text").trim() || "#f5f5f4";
    const mutedColor = themeStyle.getPropertyValue("--text-3").trim() || "#969694";
    const lineColor = themeStyle.getPropertyValue("--line-2").trim() || "#242424";
    const clone = node.cloneNode(true);
    function inlineStyles(source: any, target: any) {
      if (source.nodeType === 1) {
        for (
          var computed = getComputedStyle(source), styleText = "", propIndex = 0;
          propIndex < computed.length;
          propIndex++
        ) {
          const propName = computed[propIndex];
          styleText += propName + ":" + computed.getPropertyValue(propName) + ";";
        }
        target.setAttribute("style", styleText);
        for (let childIndex = 0; childIndex < source.children.length; childIndex++) {
          if (target.children[childIndex]) {
            inlineStyles(source.children[childIndex], target.children[childIndex]);
          }
        }
      }
    }
    inlineStyles(node, clone);
    for (
      let sourceNodes = node.querySelectorAll("*"),
        cloneNodes = clone.querySelectorAll("*"),
        nodeIndex = 0;
      nodeIndex < sourceNodes.length;
      nodeIndex++
    ) {
      if (cloneNodes[nodeIndex]) {
        var scrollLeft = sourceNodes[nodeIndex].scrollLeft;
        var scrollTop = sourceNodes[nodeIndex].scrollTop;
        if (scrollLeft || scrollTop) {
          cloneNodes[nodeIndex].style.overflow = "hidden";
          Array.prototype.forEach.call(cloneNodes[nodeIndex].children, (child) => {
            child.style.transform = "translate(" + -scrollLeft + "px," + -scrollTop + "px)";
          });
        }
      }
    }
    Array.prototype.forEach.call(
      clone.querySelectorAll(".snap-btn,.mwc-hit,.kp-tip,.ib,.dd-scrim,.dd-menu"),
      (el) => {
        el.remove();
      },
    );
    clone.style.margin = "0";
    const nodeWidth = node.offsetWidth;
    const nodeHeight = node.offsetHeight;
    const padding = 28;
    const footerHeight = 46;
    clone.style.width = nodeWidth + "px";
    clone.style.maxWidth = "none";
    const now = new Date();
    const dateStamp = now.toISOString().slice(0, 10);
    const wrapper = document.createElement("div");
    wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    wrapper.setAttribute(
      "style",
      "box-sizing:border-box;width:" +
        (nodeWidth + padding * 2) +
        "px;padding:" +
        padding +
        "px;background:" +
        surfaceColor +
        ";font-family:" +
        getComputedStyle(document.body).fontFamily +
        ";",
    );
    wrapper.appendChild(clone);
    const footer = document.createElement("div");
    footer.setAttribute(
      "style",
      "display:flex;align-items:center;justify-content:space-between;height:" +
        footerHeight +
        "px;margin-top:16px;padding-top:14px;border-top:1px solid " +
        lineColor +
        ";color:" +
        textColor +
        ";font-size:15px;font-weight:700;",
    );
    footer.innerHTML =
      '<span style="display:flex;align-items:center;gap:10px"><span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:4px;background:' +
      textColor +
      '"><svg width="18" height="18" viewBox="-6 -6 112 112"><path fill-rule="evenodd" fill="' +
      surfaceColor +
      '" d="' +
      LOGO_MARK_PATH +
      '"/></svg></span>OpenFutures.xyz</span><span style="font-size:12px;font-weight:500;color:' +
      mutedColor +
      '">Snapshot ' +
      dateStamp +
      "</span>";
    wrapper.appendChild(footer);
    const totalWidth = nodeWidth + padding * 2;
    const totalHeight = nodeHeight + padding * 2 + footerHeight + 16;
    const renderScale = 3840 / totalWidth;
    const images = clone.querySelectorAll("img");
    const pendingTasks = [];
    Array.prototype.forEach.call(images, (img) => {
      const imgSrc = img.getAttribute("src") || "";
      if (!!imgSrc && imgSrc.indexOf("data:") !== 0) {
        pendingTasks.push(
          fetch(imgSrc)
            .then((response) => response.blob())
            .then(
              (blob) =>
                new Promise<void>((resolve) => {
                  const imgReader = new FileReader();
                  imgReader.onload = () => {
                    img.setAttribute("src", imgReader.result as string);
                    resolve();
                  };
                  imgReader.onerror = () => {
                    resolve();
                  };
                  imgReader.readAsDataURL(blob);
                }),
            )
            .catch(() => {}),
        );
      }
    });
    pendingTasks.push(
      loadFontCss().then((fontCss: any) => {
        if (fontCss) {
          const styleEl = document.createElement("style");
          styleEl.textContent = fontCss;
          wrapper.insertBefore(styleEl, wrapper.firstChild);
        }
      }),
    );
    Promise.all(pendingTasks).then(() => {
      const serializedHtml = new XMLSerializer().serializeToString(wrapper);
      const svgMarkup =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' +
        Math.round(totalWidth * renderScale) +
        '" height="' +
        Math.round(totalHeight * renderScale) +
        '"><g transform="scale(' +
        renderScale +
        ')"><foreignObject x="0" y="0" width="' +
        totalWidth +
        '" height="' +
        totalHeight +
        '">' +
        serializedHtml +
        "</foreignObject></g></svg>";
      const svgImage = new Image();
      svgImage.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(totalWidth * renderScale);
          canvas.height = Math.round(totalHeight * renderScale);
          const ctx = canvas.getContext("2d")!;
          ctx.fillStyle = surfaceColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(svgImage, 0, 0);
          canvas.toBlob((pngBlob) => {
            if (!pngBlob) {
              onDone(false);
              return;
            }
            if (saveApi && saveApi.save) {
              saveApi
                .save({ filename: filename, data: pngBlob })
                .then(() => {
                  onDone(true);
                })
                .catch((error: any) => {
                  onDone(
                    false,
                    error && error.code === "declined"
                      ? "Snapshot not saved."
                      : "Saving is not available here.",
                  );
                });
              return;
            }
            const link = document.createElement("a");
            link.href = URL.createObjectURL(pngBlob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => {
              URL.revokeObjectURL(link.href);
            }, 4000);
            onDone(true);
          }, "image/png");
        } catch {
          onDone(false);
        }
      };
      svgImage.onerror = () => {
        onDone(false);
      };
      svgImage.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgMarkup);
    });
  } catch {
    onDone(false);
  }
}
export function renderShareCard(onDone: any) {
  try {
    const card = document.getElementById("share-card");
    if (!card) {
      onDone(false);
      return;
    }
    const clone = card.cloneNode(true) as HTMLElement;
    function inlineStyles(source: any, target: any) {
      for (
        var computed = getComputedStyle(source), styleText = "", propIndex = 0;
        propIndex < computed.length;
        propIndex++
      ) {
        const propName = computed[propIndex];
        styleText += propName + ":" + computed.getPropertyValue(propName) + ";";
      }
      target.setAttribute("style", styleText);
      for (let childIndex = 0; childIndex < source.children.length; childIndex++) {
        if (target.children[childIndex]) {
          inlineStyles(source.children[childIndex], target.children[childIndex]);
        }
      }
    }
    inlineStyles(card, clone);
    clone.style.margin = "0";
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const renderScale = 3;
    const serializedHtml = new XMLSerializer().serializeToString(clone);
    const svgMarkup =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      cardWidth * renderScale +
      '" height="' +
      cardHeight * renderScale +
      '"><g transform="scale(' +
      renderScale +
      ')"><foreignObject x="0" y="0" width="' +
      cardWidth +
      '" height="' +
      cardHeight +
      '">' +
      serializedHtml +
      "</foreignObject></g></svg>";
    const svgImage = new Image();
    svgImage.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = cardWidth * renderScale;
        canvas.height = cardHeight * renderScale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(svgImage, 0, 0);
        canvas.toBlob((pngBlob) => {
          if (!pngBlob) {
            onDone(false);
            return;
          }
          const link = document.createElement("a");
          link.href = URL.createObjectURL(pngBlob);
          link.download = "openfutures-share.png";
          document.body.appendChild(link);
          link.click();
          link.remove();
          setTimeout(() => {
            URL.revokeObjectURL(link.href);
          }, 2000);
          onDone(true);
        }, "image/png");
      } catch {
        onDone(false);
      }
    };
    svgImage.onerror = () => {
      onDone(false);
    };
    svgImage.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgMarkup);
  } catch {
    onDone(false);
  }
}
