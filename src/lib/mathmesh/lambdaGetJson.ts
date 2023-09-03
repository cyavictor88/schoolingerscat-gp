export interface CharMesh {
  verts: number[];
  tris: number[];
}

export async function callLambdaFunction(chars:string) : Promise<Record<string,CharMesh>>{

  let url = 'https://70z9hnualj.execute-api.us-west-2.amazonaws.com/mathmesh?'+'chars='+chars;
  

  if(location && location.hostname.includes("localhost")){
    // console.log('calling local mathmesh')
    url = 'http://localhost:3001/mathmesh?chars='+chars;
  }


  const requestData = {
    name: chars,

  };

  const requestOptions = {
    method: 'GET',
    // body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'

    },
  };

  const ret:Record<string,CharMesh> = {}
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      ret[data[i].name] = {verts: data[i].verts, tris: data[i].tris};
    }
    // Handle the Lambda response data here
    // console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error calling Lambda function:', error);
  }
  return ret;
}
