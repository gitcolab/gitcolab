<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Controller;

use Gitcolab\DomainManager;
use Gitcolab\Form\Type\ProjectType;
use Gitcolab\Model\Project;
use Gitcolab\Repository\ProjectRepository;
use Gitonomy\Git\Blob;
use Gitonomy\Git\Repository;
use Gitonomy\Git\Tree;
use Michelf\Markdown;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ProjectController extends AbstractController
{
    /** @var ProjectRepository */
    private $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function createAction(Request $request)
    {
        $project = new Project();

        $form = $this->createForm(ProjectType::class, $project, [
            'user_id' => $this->getUser(),
        ]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->get(DomainManager::class)->create($project);

            return $this->redirectToRoute('dashboard');
        }

        return $this->render('Project/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function showAction(Request $request, Project $project)
    {
        $data = [
            'project' => $project,
            'slug' => $project->getFullSlug(),
            'gitcolab_url' => str_replace('http://', '', $this->container->getParameter('gitcolab.url')),
        ];
        $path = '';

        /** @var Repository $repository */
        $repository = $project->getRepository();
        $refs = $repository->getReferences();

        $revision = $repository->getRevision($project->getDefaultBranch());

        try {
            $commit = $revision->getCommit();
            $tree = $commit->getTree();
            if (\strlen($path) > 0 && '/' === substr($path, 0, 1)) {
                $path = substr($path, 1);
            }

            try {
                $element = $tree->resolvePath($path);
            } catch (\InvalidArgumentException $e) {
                throw $this->createNotFoundException($e->getMessage());
            }

            $data = array_merge($data, [
                'tree' => $tree,
                'revision' => $revision,
                'path' => $path,
                'refs' => $refs,
                'readme' => $this->getReadme($tree),
            ]);
        } catch (\InvalidArgumentException $e) {
            $data['revision'] = false;
        }

        return $this->render('Project/show.html.twig', $data);
    }

    /**
     * @param $tree
     *
     * @return array|null
     */
    private function getReadme($tree)
    {
        foreach ($tree->getEntries() as $name => $file) {
            if (preg_match('/^readme*/i', $name)) {
                return [
                    'filename' => $name,
                    'content' => Markdown::defaultTransform($tree->resolvePath($name)->getContent()),
                ];
            }
        }

        return null;
    }

    /**
     * @param $repository
     * @param $revision Can be a branch name or a commit hash
     * @param $path
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function treeAction($repository, $revision, $path)
    {
        $project = $this->getProject($repository);

        $repository = $project->getRepository();
        $refs = $repository->getReferences();
        if ($refs->hasBranch($revision)) {
            $revision = $refs->getBranch($revision);
        } else {
            $revision = $repository->getRevision($revision);
        }
        $commit = $revision->getCommit();
        $tree = $commit->getTree();

        if (\strlen($path) > 0 && '/' === substr($path, 0, 1)) {
            $path = substr($path, 1);
        }

        try {
            $element = $tree->resolvePath($path);
        } catch (\InvalidArgumentException $e) {
            throw $this->createNotFoundException($e->getMessage());
        }

        $parameters = [
            'project' => $project,
            'revision' => $revision,
            'path' => $path,
        ];

        if ($element instanceof Blob) {
            $parameters['blob'] = $element;
            $tpl = 'Project/blob.html.twig';
        } elseif ($element instanceof Tree) {
            $parameters['tree'] = $element;
            $tpl = 'Project/tree.html.twig';
        }

        return $this->render($tpl, $parameters);
    }

    /**
     * Display commits history.
     */
    public function commitsAction(Request $request, $slug)
    {
        $branch = $request->query->get('branch', 'master');
        $project = $this->getProject($slug);
        $repository = $project->getRepository();
        $log = $repository->getLog($branch);
        $log
            ->setOffset($request->query->get('offset', 0))
            ->setLimit($request->query->get('limit', 25))
        ;

        return $this->render('Project/commits.html.twig', [
            'project' => $project,
            'branch' => $branch,
            'log' => $log,
        ]);
    }

    /**
     * Displays a commit.
     */
    public function commitAction($repository, $hash)
    {
        $project = $this->getProject($repository);
        $commit = $project->getRepository()->getCommit($hash);

        return $this->render('Project/commit.html.twig', [
            'project' => $project,
            'reference' => $project->getDefaultBranch(),
            'commit' => $commit,
        ]);
    }

    protected function getProject($slug)
    {
        $project = $this->projectRepository->findOneBy(['slug' => $slug]);

        if (null === $project) {
            throw $this->createNotFoundException('Project not found');
        }

        return $project;
    }
}
