import React, { useState } from 'react';
import './ColorPicker.scss';
function ColorPicker({
  name,
  label,
  type,
  value,
  handlechange,
  ...rest
}) {
  const [selected, setSelected] = useState([]);

  const colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    whitesmoke: '#f5f5f5',
    darkred: '#8b0000',
    crimson: '#dc143c',
    red: '#ff0000',
    midnightblue: '#191970',
    mediumblue: '#0000cd',
    dodgerblue: '#1e90ff',
    cyan: '#00ffff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    yellow: '#ffff00',
    darkgreen: '#006400',
    lime: '#00ff00',
    greenyellow: '#adff2f',
    seagreen: '#2e8b57',
    springgreen: '#00ff7f',
    darkorange: '#ff8c00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    purple: '#800080',
    blueviolet: '#8a2be2',
    fuchsia: '#ff00ff',
    deeppink: '#ff1493',
    hotpink: '#ff69b4',
    lightpink: '#ffb6c1',
    black: '#000000',
    dimgray: '#696969',
  };
  const handleSelect = (color) => {
    const e = { target: { name, type } };
    if (selected.includes(color)) {
      const ind = selected.indexOf(color);
      const copy = [...selected];
      copy.splice(ind, 1);
      setSelected(copy);
      return;
    }
    setSelected((pre) => [...pre, color]);
    handlechange(e, selected);
  };

  return (
    <div className="color-picker-container">
      <h3>Select Colors</h3>
      <div className="select-list">
        {Object.entries(colors).map((data) => (
          <span
            name={name}
            type={type}
            value={selected}
            style={{ backgroundColor: data[1] }}
            className={
              selected.includes(data[1])
                ? 'color-picker-item color-picker-item-active'
                : 'color-picker-item'
            }
            name={data[0]}
            value={data[1]}
            onClick={(event) => handleSelect(data[1])}
          />
        ))}
      </div>
      <h3>Selected Colors</h3>
      <div className="selected-list">
        {selected.map((color) => (
          <span
            style={{ backgroundColor: color }}
            className="color-picker-item"
            onClick={() => handleSelect(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
