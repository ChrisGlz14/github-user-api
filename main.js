const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector("input");


const fetchData = async () => {
    try {
        const res = await fetch (`https://api.github.com/chrisglz14`);
    }
    catch (error) {
        console.log(error)
    }
    return (res)
}

let getUser = () => {
    return inputSearch.value.trim() 
}

