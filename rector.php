<?php

declare(strict_types=1);

use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;

return static function (RectorConfig $rectorConfig): void {
	$rectorConfig->paths([
		__DIR__ . '/config',
		__DIR__ . '/public',
		__DIR__ . '/src',
	]);

	// register a single rule
	$rectorConfig->rule(InlineConstructorDefaultToPropertyRector::class);

	$rectorConfig->sets([
		LevelSetList::UP_TO_PHP_81,
		\Rector\Symfony\Set\SymfonySetList::SYMFONY_CODE_QUALITY,
		\Rector\Symfony\Set\SymfonySetList::SYMFONY_CONSTRUCTOR_INJECTION,
		\Rector\Doctrine\Set\DoctrineSetList::ANNOTATIONS_TO_ATTRIBUTES,
		\Rector\Symfony\Set\SymfonySetList::ANNOTATIONS_TO_ATTRIBUTES,
		\Rector\Symfony\Set\SensiolabsSetList::FRAMEWORK_EXTRA_50
	]);
};
