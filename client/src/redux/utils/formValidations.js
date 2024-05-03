
export const validateForm = (formData) => {
    const newValidations = {};

    if (!nameRegex.test(formData.name)) {
        newValidations.name = "El nombre debe tener al menos 3 caracteres y solo letras";
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.released);
    if (selectedDate >= currentDate) {
        newValidations.released = "La fecha de lanzamiento debe ser anterior a la fecha actual";
    }

    if (!ratingRegex.test(formData.rating)) {
        newValidations.rating = "El rating debe ser un número mayor que 0";
    }

    if (!platformsRegex.test(formData.platforms)) {
        newValidations.platforms = "Las plataformas deben tener al menos 3 caracteres y no contener '-'";
    }

    if (!requirementsRegex.test(formData.requirements)) {
        newValidations.requirements = "La descripción debe tener al menos 20 caracteres";
    }

    return newValidations;
};

export const nameRegex = /^[a-zA-Z\s]{3,}$/;
export const ratingRegex = /^\d+(\.\d+)?$/;
export const platformsRegex = /^[a-zA-Z\s,-]{3,}$/;
export const requirementsRegex = /^.{20,}$/;
