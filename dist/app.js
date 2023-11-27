
document.addEventListener("DOMContentLoaded", (event) => {
    var dragSrcEl = null;

    function handleDragStart(e) {
      //   this.style.opacity = "0.4";

      dragSrcEl = this;

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragEnd(e) {
      //   this.style.opacity = "1";

      items.forEach(function (item) {
        item.classList.remove("over");
      });
    }

    function handleDragOver(e) {
      e.preventDefault();
      return false;
    }

    function handleDragEnter(e) {
      const hijoThis = this.querySelector("[data-type]");
      const hijoDrag = dragSrcEl.querySelector("[data-type]");

      if (hijoThis.dataset.type == hijoDrag.dataset.type) {
        this.classList.add("over");
      }
    }

    function handleDragLeave(e) {
      this.classList.remove("over");
    }
    function handleDrop(e) {
      e.stopPropagation(); // stops the browser from redirecting.

      const hijoThis = this.querySelector("[data-type]");
      const hijoDrag = dragSrcEl.querySelector("[data-type]");

      if (hijoThis.dataset.type != hijoDrag.dataset.type) {
        return false;
      }
      if (dragSrcEl !== this && dragSrcEl.classList.contains("active") && !this.classList.contains("active")) {
        dragSrcEl.innerHTML = this.innerHTML;
        dragSrcEl.classList.remove("active");
        this.innerHTML = e.dataTransfer.getData("text/html");
        this.classList.add("active");
      }

      return false;
    }
    let items = document.querySelectorAll(".container .element");
    items.forEach(function (item) {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("dragover", handleDragOver);
      item.addEventListener("dragenter", handleDragEnter);
      item.addEventListener("dragleave", handleDragLeave);
      item.addEventListener("dragend", handleDragEnd);
      item.addEventListener("drop", handleDrop);
    });
  });