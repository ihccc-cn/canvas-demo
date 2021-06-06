import * as demo from "./demo";
import { Control } from "./_utils";

Control.appendTo(document.getElementById("root"));

const name = window.location.pathname.split("/")[1];

!!name && demo.hasOwnProperty(name) && demo[name].call();
