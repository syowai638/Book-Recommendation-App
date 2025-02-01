const BookSearch = ({ searchTerm, onSearch }) => {

 return (
   <div>
     <label htmlFor="search">Search Books:</label>
     <input
       type="text"
       id="search"
       name="search"
       value={searchTerm}
       onChange={(e) => onSearch(e.target.value)}
       placeholder="Search by title or genre"
     />
   </div>
 );
};


export default BookSearch;
