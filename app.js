
function showTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
};
window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  const savedWeight = localStorage.getItem('weight');
  if (savedWeight) document.getElementById('weight').value = savedWeight;
  const savedLog = localStorage.getItem('log');
  if (savedLog) document.getElementById('log').value = savedLog;
  drawChart();
};
function saveWeight() {
  const weight = document.getElementById('weight').value;
  localStorage.setItem('weight', weight);
  drawChart();
}
function drawChart() {
  const ctx = document.getElementById('weightChart').getContext('2d');
  const savedWeight = localStorage.getItem('weight');
  if (!savedWeight) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1'],
      datasets: [{
        label: 'Weight (lbs)',
        data: [savedWeight],
        fill: false,
        borderColor: 'red',
        tension: 0.1
      }]
    }
  });
}
function saveLog() {
  const log = document.getElementById('log').value;
  localStorage.setItem('log', log);
}
function exportLog() {
  const log = localStorage.getItem('log') || '';
  const blob = new Blob([log], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'workout_log.txt';
  a.click();
}
