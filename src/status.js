export default function status() {
    const div = document.createElement('div');
    div.className = 'status';
    div.innerText = '(Click location above to attack)';
    return div;
}
