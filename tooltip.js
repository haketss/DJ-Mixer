
document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    document.querySelectorAll('[title]').forEach(element => {
        const title = element.getAttribute('title');
        element.setAttribute('data-title', title);
        element.removeAttribute('title');

        element.addEventListener('mouseenter', (e) => {
            tooltip.textContent = title;
            tooltip.style.display = 'block';
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        });

        element.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
});
