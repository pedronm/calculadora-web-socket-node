function adicao(x, y){
    return x + y;
}

function subtracao(x, y){
    return x - y;
}

function multiplicacao(x, y){
    return x * y;
}

function divisao(x, y){
    if( y != 0){
        return x / y;
    }else{
        return 'Não é possível dividir por zero.'
    }
}    

function getCalculos(calcRay)
{
  var numbers = calcRay.split(' '),
  operations = [],
  i = 0,
  n1 = 0
  
  for(i = 0; i < numbers.length ; i ++)
  {

    if(isOperator(numbers[i]) != null)
    {
      console.log("Entrei no bagulho ", numbers[i])
      addOperator(operations, i, numbers, n1)
    }
    else if(!isNaN(numbers[i])){
      n1 = numbers[i]
    }
    else
    {
      console.log("caraca não entrei e não sou um número?", numbers[i])
      return null
    }
    
  }
  
  return operations
}

function addOperator(array, i, nums, numAnt)
{
  op = nums[i]        
  n2 = nums[i+1]
  
  if( (n2 != null || n2 != undefined)  && (op != null && op != undefined) )
    {
      array.push(`${numAnt} ${op} ${n2}`)
    }else{
      i = nums.length
      return 
    }
  
  if(nums[i + 2] == null || nums[i+2] == undefined)
  {
    i = nums.length
  }
    
  if(isOperator(nums[i + 2]) != null)
  {
    n1 = nums[i + 3]
    array.push(nums[i + 2])
    i + 3 == nums.length
    if( i + 3 == nums.length){
      array.push(nums[i + 3])
      return
    }              
    else
      i += 2
  }else{
    n1 = nums[i + 2]
    i += 2
  }

}

function calculateRay(ray){
  n = 0
  n1 = 0
  n2 = 0
  tot = 0

  if(ray == undefined || ray == null)
    return 0

  for (i = 0; i <= ray.length; i++)
  {
    n = ray[i]
    n1 = ray[i+1]
    n2 = ray[i-1]
    
    if(n == null && n == undefined)
      break
    
    if( n.length == 1 
      && n1 != null || n1 != undefined
      && n2 != null || n2 != undefined)
    {
      n1 = getJsonCalc(n2)
      n2 = getJsonCalc(n1) 
      op = isOperator(n)

      tot += doOperator(op,
        {
          a: n1,
          b: n2
        })
      
    }else {
        tot += getJsonCalc(n)   
    }
  }
  return tot
}

function getJsonCalc(trg) {
  nums = trg.split(' ')
  obj = {
      a: new Number(nums[0]),
      b: new Number(nums[2])
    }
  return doOperator(nums[1],obj)
}

function isOperator(op){
  operators = ['-', '+', 'x', '/' ]
  return operators.find(item => {
    if(item === op)
      return item
    else
      return null
  }) 
}

function doOperator(op, nums){
  switch(op){
    case '+':
      return adicao(nums.a, nums.b)
    case '-':
      return subtracao(nums.a, nums.b)
    case 'x':
      return multiplicacao(nums.a, nums.b)
    case '/':
      return divisao(nums.a, nums.b)
  }
}


module.exports = {
    add: adicao,
    sub: subtracao,
    mult: multiplicacao,
    div: divisao,
    calcsToArray: getCalculos,
    doTheMathWArray: calculateRay

}