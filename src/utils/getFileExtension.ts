const getFileExtension = (filename: string) => {
	const arr = filename.split(".");
	return arr[arr.length - 1];
};
export default getFileExtension;
