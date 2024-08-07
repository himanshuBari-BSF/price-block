<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// var_dump( $attributes )

?>

<div class="product-card" style="background-color: <?php echo $attributes['bgColor']; ?>">
	<div className="product-details">
		<h2 class="product-title"><?php echo $attributes['title']; ?></h2>
		<p class="product-price">
			<?php echo "{$attributes['currency']} {$attributes['price']} / {$attributes['duration']}"; ?>
		</p>
		<ul class="product-features">
			<?php foreach ( $attributes['features'] as $feat ) { ?>
				<li><?php echo $feat; ?></li>
			<?php } ?>
		</ul>
	</div>
	<a href="<?php echo $attributes['cta']['href']; ?>" class="product-call-to-action">
		<?php echo $attributes['cta']['msg']; ?>
	</a>
</div>