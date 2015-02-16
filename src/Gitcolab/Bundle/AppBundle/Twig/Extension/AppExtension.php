<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Twig\Extension;
use Gitcolab\Bundle\AppBundle\Model\Project;

class AppExtension extends \Twig_Extension
{
    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            'gravatar'    => new \Twig_Function_Method($this, 'getGravatar'),
            'branches_activity'  => new \Twig_Function_Method($this, 'getBranchesActivity'),
        );
    }

    // get gravatar image
    public function getGravatar($email, $size = null, $default = 'mm', $rating = null, $secure = null)
    {
        $defaults = array(
            'size'    => 80,
            'rating'  => 'g',
            'default' => null,
            'secure'  => false,
        );

        $map = array(
            's' => $size    ?: $defaults['size'],
            'r' => $rating  ?: $defaults['rating'],
            'd' => $default ?: $defaults['default'],
        );

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
            $rows[] = array(
                'branch'           => $branch,
                'above'            => $logAbove->count(),
                'behind'           => $logBehind->count(),
                'lastModification' => $branch->getLastModification(),
            );
        }
        usort($rows, function ($left, $right) {
            return $left['lastModification']->getAuthorDate() < $right['lastModification']->getAuthorDate();
        });
        return $rows;
    }

    public function getName()
    {
        return 'app_extension';
    }
}
