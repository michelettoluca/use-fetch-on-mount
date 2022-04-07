import { useState, useEffect } from "react";

export const useFetchOnMount = (url, options = {}) => {
	const [data, setData] = useState(null);
	const [status, setStatus] = useState("idle");

	useEffect(() => {
		let isMounted = true;

		(async () => {
			setStatus("loading");

			try {
				const response = await fetch(url, options);
				const _data = await response.json();

				if (isMounted) {
					setData(_data);
					setStatus(response.ok ? "success" : "error");
				}
			} catch {
				if (isMounted) {
					setStatus("error");
				}
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);

	return { data, status };
};
