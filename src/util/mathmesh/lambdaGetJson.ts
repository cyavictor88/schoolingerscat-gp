export async function callLambdaFunction(char:string) {
  const url = 'https://bziip7fgsjfz7wnhv3p7bqktl40vxipm.lambda-url.us-west-2.on.aws/?'+'chars='+char;
  const requestData = {
    name: char,

  };

  const requestOptions = {
    method: 'GET',
    // body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'

    },
  };

  const ret = {verts: [],tris:[]}
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    // Handle the Lambda response data here
    ret.verts = data[0].verts;
    ret.tris = data[0].tris;

    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error calling Lambda function:', error);
  }
  return ret;
}
