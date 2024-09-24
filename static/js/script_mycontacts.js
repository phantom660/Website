function chgimg(name, txt) {
    var theImage = document.getElementById("image");
    theImage.src = name;
    theImage.alt = txt;
}

function showImg(row) {
    const img = row.querySelector('img');
    if (img) {
        img.style.display = 'inline';
    }
}

function hideImg(row) {
    const img = row.querySelector('img');
    if (img) {
        img.style.display = 'none';
    }
}