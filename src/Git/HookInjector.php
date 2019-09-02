<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Git;

use Gitcolab\Event\ProjectEvent;

class HookInjector
{
    protected $hooks;

    public function __construct(array $hooks)
    {
        $this->hooks = $hooks;
    }

    public function onProjectCreate(ProjectEvent $event)
    {
        $hooks = $event->getProject()->getRepository()->getHooks();

        foreach ($this->hooks as $name => $file) {
            $hooks->setSymlink($name, $file);
        }
    }
}
