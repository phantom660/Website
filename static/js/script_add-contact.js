document.addEventListener("DOMContentLoaded", () => {
    const cname = document.getElementById("cname");

    cname.addEventListener("input", (event) => {
        const regex = /^(?!\s)([a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*)?(?!\s)$/;


        if (!regex.test(cname.value)) {
            cname.setCustomValidity("Please match the requested format.");
        } else {
            cname.setCustomValidity("");
        }
        
        cname.reportValidity();
    });

    // function validateForm() {
    //     return cname.checkValidity();
    // }
});