var texttextUtil = {
    f: {
        addStyle: function (elem, prop, val, vendors) {
            var i, ii, property, value
            if (!texttexttextUtil.f.isElem(elem)) {
                elem = document.getElementById(elem)
            }
            if (!texttextUtil.f.isArray(prop)) {
                prop = [prop]
                val = [val]
            }
            for (i = 0; i < prop.length; i += 1) {
                var thisProp = String(prop[i]),
                    thisVal = String(val[i])
                if (typeof vendors !== "undefined") {
                    if (!texttextUtil.f.isArray(vendors)) {
                        vendors.toLowerCase() == "all" ? vendors = ["webkit", "moz", "ms", "o"] : vendors = [vendors]
                    }
                    for (ii = 0; ii < vendors.length; ii += 1) {
                        elem.style[vendors[i] + thisProp] = thisVal
                    }
                }
                thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1)
                elem.style[thisProp] = thisVal
            }
        },
        cssLoaded: function (event) {
            var child = texttextUtil.f.getTrg(event)
            child.setAttribute("media", "all")
        },
        events: {
            cancel: function (event) {
                texttextUtil.f.events.prevent(event)
                texttextUtil.f.events.stop(event)
            },
            prevent: function (event) {
                event = event || window.event
                event.preventDefault()
            },
            stop: function (event) {
                event = event || window.event
                event.stopPropagation()
            }
        },
        getSize: function (elem, prop) {
            return parseInt(elem.getBoundingClientRect()[prop], 10)
        },
        getTrg: function (event) {
            event = event || window.event
            if (event.srcElement) {
                return event.srcElement
            } else {
                return event.target
            }
        },
        isElem: function (elem) {
            return (texttextUtil.f.isNode(elem) && elem.nodeType == 1)
        },
        isArray: function (v) {
            return (v.constructor === Array)
        },
        isNode: function (elem) {
            return (typeof Node === "object" ? elem instanceof Node : elem && typeof elem === "object" && typeof elem.nodeType === "number" && typeof elem.nodeName === "string" && elem.nodeType !== 3)
        },
        isObj: function (v) {
            return (typeof v == "object")
        },
        replaceAt: function (str, index, char) {
            return str.substr(0, index) + char + str.substr(index + char.length);
        }
    }
},
textA = {
    f: {
        init: {
            register: function () {
                console.clear()// just cuz codepen
                var child, children = document.getElementsByClassName("textarea"), i
                for (i = 0; i < children.length; i += 1) {
                    child = children[i]
                    texttextUtil.f.addStyle(child, "Opacity", 1)
                }
                child = document.getElementsByClassName("psuedo_select")[1]

                child.addEventListener("click", textA.f.select.toggle)

            },
            unregister: function () {
                //just here as a formallity
                //call this to stop all ongoing timeouts are ready the page for some sort of json re-route
            }
        },
        select:{
            blur: function (field){
                field.classList.remove("focused");
            },
            focus: function(field){
                field.classList.add("focused")
            },
            toggle: function(event){
                texttextUtil.f.events.stop(event)
                var child = texttextUtil.f.getTrg(event), children, i, parent
                switch (true) {
                    case (child.classList.contains("psuedo_select")):
                        case (child.classList.contains("deselect")):
                            parent = child.parentNode
                            break
                        case (child.classList.contains("options")):
                            parent = child.parentNode.parentNode
                            break
                        case (child.classList.contains("option")):
                            parent = child.parentNode.parentNode.parentNode
                            textA.f.select.selection(child, parent)
                            break
                }
                parent.classList.contains("focused") ? textA.f.select.blur(parent) : textA.f.select.focus(parent)
            }
        }
    }
}
// window.onload = textA.f.init.register