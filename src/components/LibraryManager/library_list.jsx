import React, { useState, useEffect } from 'react';
import library_final from '/components/LibraryManager/library_final'
import axios from 'axios';

function LibraryManager() {
    const [libraries, setLibraries] = useState([]);}

    useEffect(() => {
        axios.get('/libraries')
          .then(response => setLibraries(response.data))
          .catch(error => console.error('Error fetching libraries', error));
      }, []);
