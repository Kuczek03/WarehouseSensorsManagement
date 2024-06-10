document.addEventListener('DOMContentLoaded', () => {
    let liczbaLodowek = 0;
    let liczbaPolekWLodowce = [];
    let temperatury = [];

    const daneLodowekDiv = document.getElementById('daneLodowek');
    const przyciskDodaj = document.getElementById('przyciskDodaj');
    const przyciskUsunWszystkie = document.getElementById('przyciskUsunWszystkie');
    const przyciskWykresy = document.getElementById('przyciskWykresy');
    const wykresyDiv = document.getElementById('wykresy');
    const wykresLodowek = document.getElementById('wykresLodowek').getContext('2d');
    let wykres = null;

    function wyswietlDaneLodowek() {
        daneLodowekDiv.innerHTML = '';
        for (let i = 0; i < liczbaLodowek; i++) {
            const lodowkaDiv = document.createElement('div');
            lodowkaDiv.classList.add('lodowka');
            lodowkaDiv.innerHTML = `<h3>Lodówka ${i + 1}</h3>`;
            for (let j = 0; j < liczbaPolekWLodowce[i]; j++) {
                const polkaDiv = document.createElement('div');
                polkaDiv.classList.add('polka');
                polkaDiv.innerHTML = `Półka ${j + 1}: <span class="temperatura">${temperatury[i][j].toFixed(1)} °C</span>`;
                lodowkaDiv.appendChild(polkaDiv);
            }
            const przyciskUsun = document.createElement('button');
            przyciskUsun.textContent = 'Usuń lodówkę';
            przyciskUsun.classList.add('button-usun');
            przyciskUsun.addEventListener('click', () => usunLodowke(i));
            lodowkaDiv.appendChild(przyciskUsun);
            daneLodowekDiv.appendChild(lodowkaDiv);
        }
    }

    function dodajLodowke() {
        liczbaLodowek++;
        const liczbaPolek = Math.floor(Math.random() * 3) + 2; // Dodaje losową liczbę półek (2 do 4)
        liczbaPolekWLodowce.push(liczbaPolek);
        const noweTemperatury = [];
        for (let i = 0; i < liczbaPolek; i++) {
            noweTemperatury.push(Math.round(Math.random() * 50) * 0.1);
        }
        temperatury.push(noweTemperatury);
        wyswietlDaneLodowek();
    }

    function usunLodowke(index) {
        liczbaLodowek--;
        liczbaPolekWLodowce.splice(index, 1);
        temperatury.splice(index, 1);
        wyswietlDaneLodowek();
    }

    function usunWszystkieLodowki() {
        liczbaLodowek = 0;
        liczbaPolekWLodowce = [];
        temperatury = [];
        wyswietlDaneLodowek();
    }

    function pokazWykresy() {
        if (wykresyDiv.style.display === 'none' || !wykresyDiv.style.display) {
            wykresyDiv.style.display = 'block';
            przyciskWykresy.textContent = 'Ukryj statystyki';
            const data = {
                labels: [],
                datasets: []
            };
            for (let i = 0; i < liczbaLodowek; i++) {
                data.labels.push(`Lodówka ${i + 1}`);
                const dataset = {
                    label: `Lodówka ${i + 1}`,
                    data: temperatury[i],
                    borderColor: `hsl(${i * 60}, 100%, 50%)`,
                    backgroundColor: `hsla(${i * 60}, 100%, 50%, 0.2)`,
                    fill: true
                };
                data.datasets.push(dataset);
            }
            if (wykres) {
                wykres.destroy();
            }
            wykres = new Chart(wykresLodowek, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Półki'
                            },
                            min: 0,
                            max: 3
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Temperatura (°C)'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            wykresyDiv.style.display = 'none';
            przyciskWykresy.textContent = 'Pokaż statystyki';
        }
    }

    przyciskDodaj.addEventListener('click', dodajLodowke);
    przyciskUsunWszystkie.addEventListener('click', usunWszystkieLodowki);
    przyciskWykresy.addEventListener('click', pokazWykresy);

    wyswietlDaneLodowek();
});