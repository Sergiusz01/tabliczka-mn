import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function App() {
  const [wymiar, setWymiar] = useState(2);
  const [kolor1, setKolor1] = useState('#white');
  const [kolor2, setKolor2] = useState('red');
  const [modulo, setModulo] = useState(2);
  const [ramka, setRamka] = useState(true);
  const [rozmiarTabeli, setRozmiarTabeli] = useState(100); // procent
  const [paddingKomorki, setPaddingKomorki] = useState(5); // piksele
  const [pokazTabele, setPokazTabele] = useState(false);

  const obslugaSubmit = (event) => {
    event.preventDefault();
    setPokazTabele(true);
  }

  const tooltipModulo = (
    <Tooltip>
      Modulo wpływa na wzór kolorowania. Komórki, dla których iloczyn % modulo równa się 0 używają koloru 1, w przeciwnym razie koloru 2.
    </Tooltip>
  );

  return (
    <div className="container mt-5">
      <form onSubmit={obslugaSubmit}>
        <div className="mb-3">
          <label htmlFor="frm_wymiar" className="form-label">Wymiar</label>
          <input type="number" className="form-control" min="2" max="30" id="frm_wymiar" value={wymiar} onChange={(e) => setWymiar(Number(e.target.value))} />
        </div>
        <div className="mb-3">
          <label htmlFor="frm_kolor1" className="form-label">Kolor 1</label>
          <input type="color" className="form-control" id="frm_kolor1" value={kolor1} onChange={(e) => setKolor1(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="frm_kolor2" className="form-label">Kolor 2</label>
          <select className="form-select" id="frm_kolor2" value={kolor2} onChange={(e) => setKolor2(e.target.value)}>
            <option value="red">Czerwony</option>
            <option value="green">Zielony</option>
            <option value="blue">Niebieski</option>
            <option value="pink">Różowy</option>
          </select>
        </div>
        <OverlayTrigger placement="right" overlay={tooltipModulo}>
          <div className="mb-3">
            <label htmlFor="frm_modulo" className="form-label">Modulo</label>
            <input type="range" className="form-range" min="2" max="30" id="frm_modulo" value={modulo} onChange={(e) => setModulo(Number(e.target.value))} />
          </div>
        </OverlayTrigger>
        <div className="mb-3">
          <label htmlFor="frm_rozmiarTabeli" className="form-label">Rozmiar tabeli (%)</label>
          <input type="range" className="form-range" min="50" max="100" id="frm_rozmiarTabeli" value={rozmiarTabeli} onChange={(e) => setRozmiarTabeli(Number(e.target.value))} />
        </div>
        <div className="mb-3">
          <label htmlFor="frm_paddingKomorki" className="form-label">Odstępy w komórkach (px)</label>
          <input type="range" className="form-range" min="1" max="10" id="frm_paddingKomorki" value={paddingKomorki} onChange={(e) => setPaddingKomorki(Number(e.target.value))} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="frm_ramka" checked={ramka} onChange={(e) => setRamka(e.target.checked)} />
          <label className="form-check-label" for="frm_ramka">Ramka?</label>
        </div>
        <button type="submit" className="btn btn-primary">Wyślij</button>
      </form>

      {pokazTabele && (
        <TablicaMnozenia
          wymiar={wymiar}
          kolor1={kolor1}
          kolor2={kolor2}
          modulo={modulo}
          ramka={ramka}
          rozmiarTabeli={rozmiarTabeli}
          paddingKomorki={paddingKomorki}
        />
      )}
    </div>
  );
}

function TablicaMnozenia({ wymiar, kolor1, kolor2, modulo, ramka, rozmiarTabeli, paddingKomorki }) {
  const stylTabeli = {
    border: ramka ? '1px solid black' : '',
    width: `${rozmiarTabeli}%`
  };

  const stylKomorki = {
    padding: `${paddingKomorki}px`
  };

  const wiersze = Array.from({ length: wymiar }, (_, i) => i + 1);

  return (
    <table style={stylTabeli} className="table mt-3">
      <tbody>
        {wiersze.map((y) => (
          <tr key={y}>
            {wiersze.map((x) => {
              const kolorTla = (x * y) % modulo === 0 ? kolor1 : kolor2;
              return (
                <td key={x} style={{ ...stylKomorki, backgroundColor: kolorTla }}>
                  {x * y}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
