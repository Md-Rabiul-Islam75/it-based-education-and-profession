export const registerUser = async (name, email, password) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (response.ok && data.status === 200) {
        return { success: true, message: data.message, data };
      } else {
        return { success: false, message: data.message || "Registration failed. Please try again." };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: "An error occurred during registration." };
    }
  };