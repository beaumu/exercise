<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Video;
use App\Entity\Review;

/**
 * Controller class to handle review API calls
 */
class ApiReviewController extends AbstractController
{
    /**
     * Return list of video reviews
     *
     * @param EntityManagerInterface $entityManager
     * @param int $videoId
     * @return JsonResponse
     */
    #[Route('/api/videos/{videoId}/reviews', name: 'review_list', methods: ['GET'])]
    public function list(EntityManagerInterface $entityManager, int $videoId): JsonResponse
    {
        $repository = $entityManager->getRepository(Video::class);
        
        if (!is_null($video = $repository->find($videoId))) {
            return $this->json($video->getReviews(), 200, [], [
                'groups' => ['review']
            ]);
        }
        
        return $this->json([]);
    }

    /**
     * Add new video review
     *
     * @param EntityManagerInterface $entityManager
     * @param Request $request
     * @param int $videoId
     * @return JsonResponse
     */
    #[Route('/api/videos/{videoId}/reviews', name: 'review_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, int $videoId, Request $request): JsonResponse
    {
        $videoRepository = $entityManager->getRepository(Video::class);
        $video = $videoRepository->find($videoId);

        $review = new Review();
        $review->setVideo($video);
        $review->setAuthor($request->get('author'));
        $review->setRating($request->get('rating'));
        $review->setComments($request->get('comments'));

        $entityManager->persist($review);
        $entityManager->flush();
        
        return $this->json($review, 200, [], [
            'groups' => ['review']
        ]);
    }

    /**
     * Show review by id
     *
     * @param EntityManagerInterface $entityManager
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/api/reviews/{id}', name: 'review_show')]
    public function show(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $repository = $entityManager->getRepository(Review::class);
        
        $review = $repository->find($id);
                
        return $this->json($review, 200, [], [
            'groups' => ['review']
        ]);
    }
}
