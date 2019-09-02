<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Twig\Extension;

use Gitcolab\Model\Project;
use Michelf\Markdown;
use Twig\Extension\AbstractExtension;

class AppExtension extends AbstractExtension
{
    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('gravatar', array($this, 'getGravatar')),
            new \Twig_SimpleFunction('branches_activity', array($this, 'getBranchesActivity')),
            new \Twig_SimpleFunction('gravatar', array($this, 'getGravatar')),
            new \Twig_SimpleFunction('branches_activity', array($this, 'getBranchesActivity')),
            new \Twig_SimpleFunction('markdown', array($this, 'markdown', array('is_safe' => array('html')))),
        ];
    }

    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('markdown', array($this, 'markdown', array('is_safe' => array('html'))))
        ];
    }

    // get gravatar image
    public function getGravatar($email, $size = null, $default = 'mm', $rating = null, $secure = null)
    {
        $defaults = [
            'size'    => 80,
            'rating'  => 'g',
            'default' => null,
            'secure'  => false,
        ];

        $map = [
            's' => $size    ?: $defaults['size'],
            'r' => $rating  ?: $defaults['rating'],
            'd' => $default ?: $defaults['default'],
        ];

        $hash = md5(strtolower(trim($email)));


        if (null === $secure) {
            $secure = $defaults['secure'];
        }

        return ($secure ? 'https://secure' : 'http://www') . '.gravatar.com/avatar/' . $hash . '?' . http_build_query(array_filter($map));
    }

    public function getBranchesActivity(Project $project, $branch = null)
    {
        $repository = $project->getRepository();
        $references = $repository->getReferences();
        $branchName = null === $branch ? $project->getDefaultBranch() : $branch;
        $against = $references->getBranch($branchName);
        foreach ($references->getBranches() as $branch) {
            $logBehind = $repository->getLog($repository->getRevision($branch->getFullname().'..'.$against->getFullname()));
            $logAbove = $repository->getLog($repository->getRevision($against->getFullname().'..'.$branch->getFullname()));
            $rows[] = [
                'branch'           => $branch,
                'above'            => $logAbove->count(),
                'behind'           => $logBehind->count(),
                'lastModification' => $branch->getLastModification(),
            ];
        }
        usort($rows, function ($left, $right) {
            return $left['lastModification']->getAuthorDate() < $right['lastModification']->getAuthorDate();
        });
        return $rows;
    }

    /**
     * @param $text
     * @return string
     */
    public function markdown($text)
    {
        return Markdown::defaultTransform($text);
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'app_extension';
    }
}
