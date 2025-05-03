import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function App() {

  const innovationRef = useRef(null);

  useGSAP(() => {
    const innovation = {
      element: innovationRef.current,
      bgMedias: document.querySelectorAll('.innovation_bg_media'),
    };
    const card = {
      index: document.getElementById('scroll-index'),
      heading: document.getElementById('scroll-heading'),
      thumbnail: document.querySelectorAll('.innovation_card_thumbnail > img'),
      paragraph: document.getElementById('scroll-paragraph'),
    };

    const init = () => {
      // Use the Splitting.js library to divide background media into individual cells for animation
      Splitting({
        target: innovation.bgMedias,
        by: 'cells',
        rows: 40,
        image: true,
      });
    };

    const initScroll = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: innovation.element,
          start: 'top top',
          end: '+=8000 bottom',
          scrub: 0.5,
          pin: true,
        },
      });

      for (let i = 0; i < innovation.bgMedias.length; i++) {
        const item = innovation.bgMedias[i];
        const itemCells = item.querySelectorAll('.cell'); // Cells of the background media for staggered animations
        const thumbnails = card.thumbnail[i];

        gsap.set(item, { zIndex: innovation.bgMedias.length - i }); // Set the z-index of the background media item
        gsap.set(thumbnails, {
          clipPath: 'inset(0% 0% 0% 0%)', // Initially no clipping (full visibility)
          zIndex: card.thumbnail.length - i,
        });

        // Only animate if this is not the last background media
        if (i < innovation.bgMedias.length - 1) {
          // Animate the cells of the background media (scaling down)
          tl.to(itemCells, {
            scaleY: 0,
            stagger: {
              each: 0.01,
              from: 'center', // Start staggering from the end of the grid
              ease: 'power2.inOut',
            },
          });
          tl.to(
            thumbnails,
            {
              clipPath: 'inset(0% 0% 100% 0%)', // Clip the thumbnail from top to bottom
              onComplete: () => animateThumbnailsElements(i, 'up'),
              onReverseComplete: () => animateThumbnailsElements(i, 'down'),
            },
            '-=0.75' // Overlap this animation with the previous one by 0.75 seconds
          );
        }
      }
    };

    // Function to animate the heading, index, and paragraph elements
    const animateThumbnailsElements = (index, direction) => {
      const translateDirection = direction === 'up' ? -100 : 100, // Determine the direction of movement
        indexDirection = direction === 'up' ? index + 1 : -index; // Determine index adjustment based on direction
      const calcY = indexDirection * (translateDirection / card.thumbnail.length); // Calculate the Y translation amount

      // Apply the calculated translation to each element
      card.index.style.transform = `translateY(${calcY}%)`;
      card.heading.style.transform = `translateY(${calcY}%)`;
      card.paragraph.style.transform = `translateY(${calcY}%)`;
    };

    init();
    initScroll();
  }, [])


  return (
    <>
      <main class="app">
        <section ref={innovationRef} class="innovation">
          <div class="innovation_wrapper">
            <div class="innovation_side">
              <span>Ecletiv Harmony</span>
              <span>( Keep Scrolling )</span>
            </div>

            <div class="innovation_card">
              <div class="innovation_card_container">
                <div class="innovation_card_index">
                  <div class="innovation_card_index_container" id="scroll-index">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                  </div>
                  <span>- 04</span>
                </div>

                <div class="innovation_card_heading">
                  <div class="innovation_card_heading_container" id="scroll-heading">
                    <h1>The Urban Oasis</h1>
                    <h1>Glass House by the Sea</h1>
                    <h1>Wabi-Sabi Sanctuary</h1>
                    <h1>The Dreamer's Retreat</h1>
                  </div>
                </div>

                <div class="innovation_card_thumbnail" id="scroll-thumbnail">
                  <img src="https://cdn.cosmos.so/a1b95295-041d-4caa-8f8b-7376d5c85796?format=jpeg" alt="" />
                  <img src="https://cdn.cosmos.so/1fa1d361-e49b-4ce7-91a4-c452ccf67ad2?format=jpeg" alt="" />
                  <img src="https://cdn.cosmos.so/a81fb1d4-6a6b-4613-8cad-a3f2b24762b3?format=jpeg" alt="" />
                  <img src="https://cdn.cosmos.so/1226e77b-8691-4b78-a0cc-b23a8f79b8a2?format=jpeg" alt="" />
                </div>

                <div class="innovation_card_paragraph">
                  <div
                    class="innovation_card_paragraph_container"
                    id="scroll-paragraph"
                  >
                    <p>
                      This project explores the interplay of raw concrete and
                      refined elegance. Clean lines, minimalist furnishings, and
                      unexpected accents create a space that is both industrial and sophisticated
                    </p>
                    <p>
                      Immerse yourself in the beauty of the coast in this project.
                      Floor-to-ceiling glass walls frame breathtaking sea views,
                      while an open floor plan maximizes space and natural light.
                    </p>
                    <p>
                      Celebrating the harmony of nature and modern design. Lush
                      greenery intertwines with sleek, minimalist furnishings and
                      warm wood accents, creating a vibrant and invigorating
                      atmosphere
                    </p>
                    <p>
                      This project offers a luxurious escape amidst breathtaking
                      mountain scenery. Modern architecture seamlessly blends with
                      the natural surroundings, creating a space that is both
                      sophisticated and awe-inspiring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="innovation_bg">
            <div class="innovation_bg_media">
              <div class="innovation_bg_figure">
                <img class="innovation_bg_image" src="https://cdn.cosmos.so/a1b95295-041d-4caa-8f8b-7376d5c85796?format=jpeg"></img>
              </div>
            </div>
            <div class="innovation_bg_media">
              <div class="innovation_bg_figure">
                <img class="innovation_bg_image" src="https://cdn.cosmos.so/1fa1d361-e49b-4ce7-91a4-c452ccf67ad2?format=jpeg"></img>
              </div>
            </div>
            <div class="innovation_bg_media">
              <div class="innovation_bg_figure">
                <img class="innovation_bg_image" src="https://cdn.cosmos.so/a81fb1d4-6a6b-4613-8cad-a3f2b24762b3?format=jpeg"></img>
              </div>
            </div>
            <div class="innovation_bg_media">
              <div class="innovation_bg_figure">
                <img class="innovation_bg_image" src="https://cdn.cosmos.so/1226e77b-8691-4b78-a0cc-b23a8f79b8a2?format=jpeg"></img>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
