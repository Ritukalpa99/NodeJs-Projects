import { useState } from "react";

const PlayerForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		dob: "",
		photoUrl: "",
		birthplace: "",
		career: "",
		matches: "",
		score: "",
		fifties: "",
		centuries: "",
		wickets: "",
		average: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/players", {
               methods : 'POST',
               headers : {
                'Content-Type' : 'application/json',
               } ,
               body : JSON.stringify(formData),
            });

            if(response.ok) {
                console.log("Player created successfully");
            } else {
                console.error("Failed tto create player")
            }
        }catch(err)  {
            console.error(err.message);
        }
    }


	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<br /><br />
				<label htmlFor="dob">Date of Birth:</label>
				<input
					type="text"
					id="dob"
					name="dob"
					value={formData.dob}
					onChange={handleChange}
					required
				/>
                <br /><br />
				<label htmlFor="photoUrl">Photo URL:</label>
				<input
					type="text"
					id="photoUrl"
					name="photoUrl"
					value={formData.photoUrl}
					onChange={handleChange}
				/>
                <br /><br />
				<label htmlFor="birthplace">Birthplace:</label>
				<input
					type="text"
					id="birthplace"
					name="birthplace"
					value={formData.birthplace}
					onChange={handleChange}
				/>
                <br /><br />
				<label htmlFor="career">Career :</label>
				<textarea
					id="career"
					name="career"
					value={formData.career}
					onChange={handleChange}
				/>
                <br /><br />
                <label htmlFor="matches">matches:</label>
				<input
					type="text"
					id="matches"
					name="matches"
					value={formData.matches}
					onChange={handleChange}
				/>
                <br /><br />
                <label htmlFor="score">score:</label>
				<input
					type="text"
					id="score"
					name="score"
					value={formData.score}
					onChange={handleChange}
				/>
                <br /><br />
                <label htmlFor="fifties">fifties:</label>
				<input
					type="text"
					id="fifties"
					name="fifties"
					value={formData.fifties}
					onChange={handleChange}
				/>
                <br /><br />
                <label htmlFor="centuries">centuries:</label>
				<input
					type="text"
					id="centuries"
					name="centuries"
					value={formData.centuries}
					onChange={handleChange}
				/>
                <br /><br />
                <label htmlFor="wickets">wickets:</label>
				<input
					type="text"
					id="wickets"
					name="wickets"
					value={formData.wickets}
					onChange={handleChange}
				/>
                <br /><br />
                <label htmlFor="average">average:</label>
				<input
					type="text"
					id="average"
					name="average"
					value={formData.average}
					onChange={handleChange}
				/>
                <br /><br />
                <button type="submit">Submit</button>
			</form>
		</>
	);
};

export default PlayerForm;
