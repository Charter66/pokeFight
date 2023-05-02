import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SuperDetails = () => {
  const [data, setData] = useState({});
  const { id, info } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/pokemons/${id}/${info}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, info]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let result;
  if (info === 'name') {
    result = capitalize(data.name);
  } else if (info === 'type') {
    result = data.types
      ? data.types.map((type) => capitalize(type.type.name)).join(', ')
      : '';
  } else if (info === 'base') {
    result = data.stats
      ? data.stats.map((stat) => `${capitalize(stat.stat.name)}: ${stat.base_stat}`).join(', ')
      : '';
  }

  return (
    <div>
      <h2>Super Detailed View</h2>
      <p>{result}</p>
    </div>
  );
};

export default SuperDetails;
