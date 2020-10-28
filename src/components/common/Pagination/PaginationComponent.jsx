import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
function PaginationComponent({count,setPage,currentPage}) {
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
        <Pagination count={count} page={currentPage} onChange={handleChange} color = 'primary' />
    )
}

export default PaginationComponent
