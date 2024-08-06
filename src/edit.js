import { __ } from "@wordpress/i18n";
import {
	TextControl,
	Flex,
	FlexItem,
	Button,
	PanelBody,
	PanelRow,
	Panel,
	Dashicon,
	ColorPalette,
} from "@wordpress/components";
import {
	InspectorControls,
	useBlockProps,
	URLInput,
} from "@wordpress/block-editor";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { title, features, price, currency, cta, duration, bgColor } =
		attributes;

	const handleFeatureChange = (val, index) => {
		const newfeatures = features?.map((attr, i) => {
			if (index == i) {
				return val;
			}
			return attr;
		});
		setAttributes({ features: newfeatures });
	};

	const handleDelete = (index) => {
		setAttributes({ features: features.filter((_feat, i) => i != index) });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<Panel>
					<PanelBody title="Background Color" initialOpen={true}>
						<PanelRow>
							<ColorPalette
								colors={[
									{
										name: "Primary",
										colors: [{ name: "primary", color: "#ff0000" }],
									},
								]}
								color={bgColor}
								onChange={(c) => setAttributes({ bgColor: c })}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title="Manage Plan">
						<PanelRow>
							<TextControl
								label={"Title"}
								type="text"
								value={title}
								onChange={(title) => setAttributes({ title })}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={"Currency"}
								type="text"
								value={currency}
								onChange={(currency) => setAttributes({ currency })}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={"Price"}
								type={"number"}
								value={price}
								onChange={(price) => setAttributes({ price })}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={"Duration"}
								type={"string"}
								value={duration}
								onChange={(duration) => setAttributes({ duration })}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={"CTA Message"}
								type="text"
								value={cta.msg}
								onChange={(msg) =>
									setAttributes({
										cta: {
											...cta,
											msg,
										},
									})
								}
							/>
						</PanelRow>
						<PanelRow>
							<URLInput
								label={"CTA Link"}
								value={cta.href}
								onChange={(href) =>
									setAttributes({
										cta: {
											...cta,
											href,
										},
									})
								}
								isFullWidth={true}
							/>
						</PanelRow>
						<PanelRow>
							<Flex direction={"column"}>
								<p>Features</p>
								{features.map((feat, j) => {
									return (
										<FlexItem>
											<Flex direction={"row"}>
												<FlexItem>
													<TextControl
														value={feat}
														key={j}
														onChange={(val) => handleFeatureChange(val, j)}
													/>
												</FlexItem>
												<FlexItem>
													<Dashicon
														style={{ marginBottom: 4, color: "#f00" }}
														icon="remove"
														onClick={() => handleDelete(j)}
													/>
												</FlexItem>
											</Flex>
										</FlexItem>
									);
								})}
								<Button
									variant="primary"
									style={{ fontSize: 16 }}
									onClick={() =>
										setAttributes({ features: features.concat([undefined]) })
									}
								>
									Add Features
									<Dashicon icon="plus" style={{ marginTop: 4 }} />
								</Button>
							</Flex>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="product-card" style={{ backgroundColor: bgColor }}>
				<div className="product-details">
					<h2 className="product-title">{title}</h2>
					<p className="product-price">
						{currency} {price} / {duration}
					</p>
					<ul className="product-features">
						{features.map((feat, j) => {
							return <li key={j}>{feat}</li>;
						})}
					</ul>
				</div>
				<div>
					<a className="product-call-to-action">{cta.msg}</a>
				</div>
			</div>
		</div>
	);
}
