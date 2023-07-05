import React from "react";
import { MdClose } from "react-icons/md";

function DynamicForm({ handleAddFormChange, addStaff, setAddStaff }) {
	const onClickFormGroupButton = (index) => {
		let updatedFields = [...addStaff];
		updatedFields.splice(index, 1);
		setAddStaff(updatedFields);
	};

	const onChangeFormGroupInput = (index, event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		let updatedFields = [...addStaff];
		let prev = updatedFields[index];
		let name = prev.split("#")[0];
		let nid = prev.split("#")[1];

		if (fieldName === "staff_name") {
			updatedFields[index] = `${fieldValue}#${nid}`;
		}
		if (fieldName === "staff_nid_number") {
			updatedFields[index] = `${name}#${fieldValue}`;
		}
		// updatedFields[index] = fieldValue;

		setAddStaff(updatedFields);

		// const newFormData = { ...addFormData };
		// newFormData[fieldName] = fieldValue;

		// setAddFormData(newFormData);
	};

	const onClickButtonSubmit = (event) => {
		event.preventDefault();
		const filteredValues = addStaff.filter((value) => value);
		alert(filteredValues);
	};

	const isFormGroupDeletionAllowed = addStaff.length > 1;

	return (
		<form className="flex flex-col space-y-2">
			<div>
				{/* <FormButton click={onClickButtonSubmit} innerHtml="Submit" /> */}
			</div>

			{addStaff.map((value, index) => (
				<FormGroup
					inputChange={(event) =>
						onChangeFormGroupInput(index, event)
					}
					buttonClick={() => onClickFormGroupButton(index)}
					buttonDisabled={
						index === 0 ? !isFormGroupDeletionAllowed : undefined
					}
					value={value}
					key={index}
					index={index + 1}
					// handleAddFormChange={handleAddFormChange}
				/>
			))}
		</form>
	);
}

function FormGroup(props) {
	return (
		<div className="flex flex-col rounded-md border-2 bg-slate-200 py-2">
			{/* <input
                className="dynamicForm__itemInput"
                type="text"
                value={props.value}
                onChange={props.inputChange}
            /> */}
			<div className="group relative w-full">
				<div className="flex items-center justify-between">
					<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
						Staff Name: {props.index}
					</label>
					{!props.buttonDisabled && (
						<MdClose
							className="inline h-6 w-6 text-red-600 "
							type="button"
							onClick={props.buttonClick}
							disabled={props.buttonDisabled}
							tabIndex="-1"
						/>
					)}
				</div>
				<input
					type="text"
					name={`staff_name`}
					required
					// onChange={props.handleAddFormChange}
					onChange={props.inputChange}
					placeholder="Staff Name"
					className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div className="group relative w-full">
				<label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
					Staff NID Number: {props.index}
				</label>
				<input
					type="text"
					name={`staff_nid_number`}
					required
					// onChange={props.handleAddFormChange}
					onChange={props.inputChange}
					placeholder="Staff NID Number"
					className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
				/>
			</div>
		</div>
	);
}

export default DynamicForm;
