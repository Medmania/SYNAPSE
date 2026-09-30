function generatePass() {
    const name = document.getElementById("pass-name").value || "Dr. Ankit Raj";
    const college = document.getElementById("pass-college").value || "MAMC Delhi";
    const type = document.getElementById("pass-type").value;
    const passID = `SYN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    document.getElementById("card-name").innerText = name;
    document.getElementById("card-college").innerText = college;
    document.getElementById("card-type").innerText = type;
    document.getElementById("card-id").innerText = `ID: ${passID}`;

    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";

    const qr = qrcode(4, 'L');
    qr.addData(`${passID}|${name}|${college}`);
    qr.make();
    qrContainer.innerHTML = qr.createImgTag(4, 4);

    document.getElementById("pass-card").classList.remove("hidden");
}
