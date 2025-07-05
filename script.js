  const ids = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6'];

  ids.forEach(id => {
    const btn = document.getElementById(id);
    btn.addEventListener('click', () => {
      ids.forEach(otherId => {
        document.getElementById(otherId).classList.remove('active');
      });
      btn.classList.add('active');
    });
  });