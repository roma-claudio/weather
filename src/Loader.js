const Loader = () => (
	<div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    }}>
		<div class="pyramid-loader">
			<div class="wrapper">
				<span class="side side1" />
				<span class="side side2" />
				<span class="side side3" />
				<span class="side side4" />
				<span class="shadow" />
			</div>
		</div>
	</div>
);

export default Loader;
