var todoFunctions = {
  convertDataFromFB: (id, data) => {
    return {
      id: id,
      name: data.name,
      isActive: data.isActive
    }
  }
}

export default todoFunctions
