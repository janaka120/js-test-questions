// generic function

function sampleGenericFun<T>(arg: T): T {
  return arg;
}

console.log(
  "sampleGenericFun >>",
  sampleGenericFun<string>("sample generic function")
);

// access modifiers
class Person {
  public name: string = "test name"; // default access modifier
  private salary: number = 50000; // access within the class itself
  protected age: number = 28; // can access from
}
