const ctx = document.getElementById('graficoVentas');
const form = document.getElementById('formVentas');
const selectTipo = document.getElementById('tipoGrafico');
const btnLimpiar = document.getElementById('btnLimpiar');

let ventas = JSON.parse(localStorage.getItem('ventas')) || [
  { mes: 'Enero', monto: 1200 },
  { mes: 'Febrero', monto: 1900 },
  { mes: 'Marzo', monto: 1500 }
];

let chart = null;

// Colores para cada tipo de gráfico
const colores = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#feca57', '#ff6b6b'];

// Función para actualizar estadísticas
function actualizarEstadisticas() {
  if (ventas.length === 0) {
    document.getElementById('totalVentas').textContent = '$0';
    document.getElementById('promedio').textContent = '$0';
    document.getElementById('maximo').textContent = '$0';
    return;
  }

  const montos = ventas.map(v => v.monto);
  const total = montos.reduce((a, b) => a + b, 0);
  const promedio = (total / montos.length).toFixed(2);
  const maximo = Math.max(...montos);

  document.getElementById('totalVentas').textContent = '$' + total;
  document.getElementById('promedio').textContent = '$' + promedio;
  document.getElementById('maximo').textContent = '$' + maximo;
}

// Función para crear el gráfico
function crearGrafico() {
  if (chart) {
    chart.destroy();
  }

  const tipo = selectTipo.value;
  const labels = ventas.map(v => v.mes);
  const datos = ventas.map(v => v.monto);

  const config = {
    type: tipo,
    data: {
      labels: labels,
      datasets: [{
        label: 'Monto de Ventas ($)',
        data: datos,
        backgroundColor: tipo === 'pie' || tipo === 'doughnut' ? colores : '#667eea',
        borderColor: tipo === 'pie' || tipo === 'doughnut' ? '#fff' : '#764ba2',
        borderWidth: tipo === 'pie' || tipo === 'doughnut' ? 3 : 2,
        tension: tipo === 'line' ? 0.4 : 0,
        fill: tipo === 'line' ? true : false,
        backgroundColor: tipo === 'line' ? 'rgba(102, 126, 234, 0.1)' : tipo === 'bar' ? '#667eea' : colores
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: tipo === 'pie' || tipo === 'doughnut',
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return '$' + context.parsed.y || context.parsed;
            }
          }
        }
      },
      scales: tipo === 'pie' || tipo === 'doughnut' ? {} : {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Monto ($)'
          }
        }
      }
    }
  };

  chart = new Chart(ctx, config);
  actualizarEstadisticas();
}

// Evento al cambiar tipo de gráfico
selectTipo.addEventListener('change', crearGrafico);

// Evento al agregar datos
form.addEventListener('submit', e => {
  e.preventDefault();
  const mes = document.getElementById('mes').value.trim();
  const monto = parseFloat(document.getElementById('monto').value);

  if (mes && !isNaN(monto) && monto > 0) {
    ventas.push({ mes, monto });
    localStorage.setItem('ventas', JSON.stringify(ventas));
    crearGrafico();
    form.reset();
  }
});

// Evento para limpiar datos
btnLimpiar.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que deseas eliminar todos los datos?')) {
    ventas = [];
    localStorage.removeItem('ventas');
    crearGrafico();
  }
});

// Crear gráfico inicial
crearGrafico();