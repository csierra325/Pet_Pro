$("#add-btn").on("click", function(event) {
  event.preventDefault();
  var newAnimal = {
    name: $("#name")
      .val()
      .trim(),
    description: $("#description")
      .val()
      .trim(),
    age: $("#age")
      .val()
      .trim(),
    breed: $("#breed")
      .val()
      .trim(),
    species: $("#species")
      .val()
      .trim()
  };

  console.log("SENT TO SERVER:", newAnimal);

  $.post("/api/pets", newAnimal)
    .then(function(data) {
      console.log("RETURNED FROM SERVER:", data);
      location.replace("/members");
    })
    .catch(function(err) {
      console.log(err);
    });

  $("#name").val("");
  $("#description").val("");
  $("#age").val("");
  $("#breed").val("");
  $("#species").val("");
});
