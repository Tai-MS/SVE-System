export const apiFetch = async (
  url: string, 
  inputBody: any = null
) => {
  const token = localStorage.getItem("token");
  
  
  try {
    
    let response;
    
    if (inputBody) {
      const esFormData = inputBody instanceof FormData;
      
      const headers: HeadersInit = {
        "token": `${token}`,
      };
      
      if (!esFormData) {
        headers["Content-Type"] = "application/json";
      }
      
      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: esFormData ? inputBody : JSON.stringify(inputBody)
      });
      
      
    } else {
      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": `${token}`
        }
      });
    }
    
    console.log("Status:", response.status);
    console.log(token);

    if (response.status === 401) {
      console.error("ERROR: Token inválido o expirado");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};