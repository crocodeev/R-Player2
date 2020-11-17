let tracksArray = [
  "A Band Called Success - How We Do_1.mp3",
  "A Band Called Success - How We Do_2.mp3",
  "A Band Called Success - How We Do_3.mp3",
  "A Band Called Success - Swoonwalk_1",
  "A Band Called Success - Swoonwalk_2",
  "A Band Called Success - Swoonwalk_3",
  ];


  const tracks = tracksArray.map((item) => {
    const obj ={};
    obj.src = "E:\\MUSIC\\" + item;
    obj.name = item;
    return obj;
  });

  export default tracks;
