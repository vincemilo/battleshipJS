export default function header() {
    const headerDiv = document.createElement('header');
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerText = 'Image Slider App';
    headerDiv.appendChild(logo);
    return headerDiv;
}
