(function() {
    "use strict";



    function ProductImage(props) {
        return <img src = {`../../../assets/${props.color}.jpg`} alt = "Product Image" /> ;
    }

    function SizeSelector(props) {
        function sizeOptions() {
            return props.sizes.map(function(num) {
                return (
                    <option value={num} key={num}>{num}</option>
                )
            });
        }

        function onSizeChange(event) {
            props.handleSizeChange(event.target.value);
        }

        return (
            <div className="field-group">
                <label htmlFor="size-options">Size:</label>
                <select defaultValue={props.size} name="sizeOptions" id="size-options" onChange={onSizeChange}>
                    { sizeOptions() }
                </select>
            </div>
        );
    }

    function ColorSelector(props) {
        function colorOptions() {
            return props.colors.map(function(name) {
                return (
                    <option value={name} key={name}>{name}</option>
                )
            });
        }

        function onColorChange(event) {
            props.handleColorChange(event.target.value);
        }

        return (
            <div className="field-group">
                <label htmlFor="color-options">color:</label>
                <select defaultValue={props.color} name="colorOptions" id="color-options" onChange={onColorChange}>
                    { colorOptions() }
                </select>
            </div>
        );
    }

    function ProductCustomizer(props) {
        var [size, setSize] = React.useState(8);
        var [sizes, setSizes] = React.useState(window.Inventory.allSizes);
        var [color, setColor] = React.useState('red');
        var [colors, setColors] = React.useState(window.Inventory.allColors);

        function handleSizeChange(selectedSize) {
            var availableColors = window.Inventory.bySize[selectedSize];
            setColors(availableColors);
            setSize(selectedSize);

            if (!colors.includes(color)) {
                setColor(availableColors[0]);
            }
        }

        function handleColorChange(selectedColor) {
            var availableSizes = window.Inventory.byColor[selectedColor];
            setSizes(availableSizes);
            setColor(selectedColor);

            if (!sizes.includes(size)) {
                setSize(availableSizes[0]);
            }
        }

        return (
            <div className="customizer" >
                <div className="product-image" >
                    <ProductImage color={color} />
                    <div className="selectors">
                       <SizeSelector size={size} sizes={sizes} handleSizeChange={handleSizeChange}/>
                       <ColorSelector color={color} colors={colors} handleColorChange={handleColorChange}/>
                    </div>
                </div>
            </div >
        );
    }

    ReactDOM.render( <ProductCustomizer /> ,
        document.getElementById('react-root')
    );

})();