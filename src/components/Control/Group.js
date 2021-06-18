function Group(title, components) {
  const dom = [
    "<div class='field-group soft inset' style=''>",
    components.map((item) => item.dom).join(""),
    "</div>",
  ].join("");
  return { title, dom };
}

export default Group;
