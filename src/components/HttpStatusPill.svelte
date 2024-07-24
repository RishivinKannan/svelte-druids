<script>
    import httpStatusCode from "../utils/httpStatusCodes";
    import StatusPill from "./StatusPill.svelte";

    /*
     * @type {string|number}
     */
    export let statusCode;
    export let hasTextDescription = false;
    export let title = true;

    $: code = typeof statusCode === "number" ? String(statusCode) : statusCode;

    $: desc = httpStatusCode[code]?.message ? httpStatusCode[code].message :'' ;

    $: level = getlevel(code);

    $: titleValue = title ? `${code} ${desc}` : ''

    $:label = hasTextDescription ? `${code} ${desc}` : code

    function getlevel(code) {
        if (code) {
            if (code[0] === "2") {
                return "success";
            } else if (code[0] === "3" || code[0] === "4") {
                return "warning";
            } else if (code[0] === "5") {
                return "danger";
            }
        }
    }

</script>

<StatusPill title={titleValue} {label} {level} {...$$restProps}/>
