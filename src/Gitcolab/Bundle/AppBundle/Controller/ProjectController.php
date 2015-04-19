<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Controller;

use Gitonomy\Git\Repository;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\View\View;
use Michelf\Markdown;
use Gitcolab\Bundle\AppBundle\Form\Type\ProjectType;
use Gitcolab\Bundle\AppBundle\Model\Project;
use Gitcolab\Bundle\AppBundle\GitcolabEvents;
use Gitcolab\Bundle\AppBundle\Event\ProjectEvent;
use Gitonomy\Git\Blob;
use Gitonomy\Git\Reference;
use Gitonomy\Git\Tree;

class ProjectController extends Controller
{
    public function createAction(Request $request)
    {
        $project = new Project();

        $form = $this->createForm(new ProjectType(), $project, array(
            'user_id' => $this->getUser()
        ));

        if ($form->handleRequest($request)->isValid()) {

            $this->persistAndFlush($project);
            $project->addUser($this->getUser(), 'ROLE_ADMIN');
            $this->persistAndFlush($project);

            $this->dispatch(GitcolabEvents::PROJECT_CREATE, new ProjectEvent($project, $this->getUser()));

            return $this->redirectToRoute('dashboard');
        }

        $view = View::create();
        $view->setData(array(
            'form' => $form->createView()
        ));
        $view->setTemplate('GitcolabAppBundle:Project:create.html.twig');

        return $this->handleView($view);
    }

    public function showAction(Request $request, Project $project)
    {
        $view = View::create();

        $data = array(
            'project' => $project,
            'slug' => $project->getFullSlug(),
            'gitcolab_url' => str_replace('http://', '', $this->container->getParameter('gitcolab.url'))
        );
        $path = '';

        $repository = $project->getRepository();
        $refs       = $repository->getReferences();

        $revision = $repository->getRevision($project->getDefaultBranch());

        try {
            $commit = $revision->getCommit();
            $tree = $commit->getTree();
            if (strlen($path) > 0 && '/' === substr($path, 0, 1)) {
                $path = substr($path, 1);
            }

            try {
                $element = $tree->resolvePath($path);
            } catch (\InvalidArgumentException $e) {
                throw $this->createNotFoundException($e->getMessage());
            }

            $data = array_merge($data, array(
                'tree' => $tree,
                'revision' => $revision,
                'path' => $path,
                'refs' => $refs,
                'readme' => $this->getReadme($tree)
            ));



        } catch (\InvalidArgumentException $e) {
            $data['revision'] =  false;
        }

        $view
            ->setData($data)
            ->setTemplate('GitcolabAppBundle:Project:show.html.twig');

        return $this->handleView($view);
    }

    /**
     * @param $tree
     * @return array|null
     */
    private function getReadme($tree)
    {
        foreach ($tree->getEntries() as $name =>  $file) {

            if (preg_match('/^readme*/i', $name)) {
                return array(
                    'filename' => $name,
                    'content'  => Markdown::defaultTransform($tree->resolvePath($name)->getContent())
                );
            }
        }
        return null;
    }

    /**
     * @param $repository
     * @param $revision Can be a branch name or a commit hash
     * @param $path
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function treeAction($repository, $revision, $path)
    {
        $project    = $this->getProject($repository);

        $repository = $project->getRepository();
        $refs       = $repository->getReferences();
        if ($refs->hasBranch($revision)) {
            $revision = $refs->getBranch($revision);
        } else {
            $revision = $repository->getRevision($revision);
        }
        $commit = $revision->getCommit();
        $tree = $commit->getTree();

        if (strlen($path) > 0 && '/' === substr($path, 0, 1)) {
            $path = substr($path, 1);
        }

        try {
            $element = $tree->resolvePath($path);
        } catch (\InvalidArgumentException $e) {
            throw $this->createNotFoundException($e->getMessage());
        }

        $parameters = array(
            'project'  => $project,
            'revision' => $revision,
            'path'     => $path,
        );

        if ($element instanceof Blob) {
            $parameters['blob'] = $element;
            $tpl = 'GitcolabAppBundle:Project:blob.html.twig';
        } elseif ($element instanceof Tree) {
            $parameters['tree'] = $element;
            $tpl = 'GitcolabAppBundle:Project:tree.html.twig';
        }

        return $this->render($tpl, $parameters);
    }

    /**
     * Display commits history
     */
    public function commitsAction(Request $request, $slug)
    {
        $branch     = $request->query->get('branch', 'master');
        $project    = $this->getProject($slug);
        $repository = $project->getRepository();
        $log        = $repository->getLog($branch);
        $log
            ->setOffset($request->query->get('offset', 0))
            ->setLimit($request->query->get('limit', 25))
        ;
        ;
        return $this->render('GitcolabAppBundle:Project:commits.html.twig', array(
            'project'  => $project,
            'branch'   => $branch,
            'log'      => $log,
        ));
    }

    /**
     * Displays a commit.
     */
    public function commitAction($repository, $hash)
    {
        $project    = $this->getProject($repository);
        $commit     = $project->getRepository()->getCommit($hash);
        return $this->render('GitcolabAppBundle:Project:commit.html.twig', array(
            'project'    => $project,
            'reference'  => $project->getDefaultBranch(),
            'commit'     => $commit
        ));
    }

    private function getProject($slug)
    {
        $project  = $this->get('gitcolab.repository.project')->findOneBy(array('slug' => $slug));

        if (null === $project) {
            throw $this->createNotFoundException('Project not found');
        }

        return $project;
    }
}
