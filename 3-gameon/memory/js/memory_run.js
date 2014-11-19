"usr strict";
var MemoryApp = {

  init: function(){
    var mem1 = new Memory(3,4,"game1");
    // var mem2 = new Memory(3,4,"game2");



    mem1.start(RandomGenerator
      .getPictureArray(mem1.getSize())
    );

    // mem2.start(RandomGenerator
    //   .getPictureArray(mem2.getSize())
    // );
  },
};

window.onload = function () {

  memoryApp = MemoryApp.init();
};
