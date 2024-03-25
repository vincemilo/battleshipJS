export default function menu() {
    const menuContainer = document.createElement('div');
    const menuDiv = document.createElement('div');
    menuDiv.className = 'menu';
    menuDiv.innerText = 'Menu';

    const options = document.createElement('div');
    options.className = 'options';
    const option1 = document.createElement('div');
    option1.innerText = 'Option 1';
    const option2 = document.createElement('div');
    option2.innerText = 'Option 2';
    const option3 = document.createElement('div');
    option3.innerText = 'Option 3';
    options.appendChild(option1);
    options.appendChild(option2);
    options.appendChild(option3);
    options.classList.add('hidden');

    menuDiv.addEventListener('click', () => {
        options.classList.toggle('hidden');
    });

    menuContainer.appendChild(menuDiv);
    menuContainer.appendChild(options);

    return menuContainer;
}
