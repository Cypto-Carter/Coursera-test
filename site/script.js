  document.getElementById("pbar").addEventListener("mouseover", startInc);
  document.getElementById("pbar").addEventListener("mouseout", stopInc);

  function startInc() {
   bigger = setInterval(increase, 1);
  console.log("starting");
  }

   function increase () {
    document.getElementById("pbar").value++;
}



  function stopInc() {
    clearInterval(bigger);
    console.log("Ending");
  }
  function view() {
      console.log(document.getElementById("pbar").value);
  }