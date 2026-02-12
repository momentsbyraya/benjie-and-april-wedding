import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage, couple } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Entourage.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EntourageSection = () => {
  const headerRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const bibleBearerRef = useRef(null)
  const ringBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const flowerBoysRef = useRef(null)
  const hereComesTheBrideRef = useRef(null)
  const veilSponsorsRef = useRef(null)
  const cordSponsorsRef = useRef(null)
  const candleSponsorsRef = useRef(null)
  const juniorFlowerGirlsRef = useRef(null)
  const littleFlowerGirlsRef = useRef(null)

  useEffect(() => {
    // Collect all names from Parents down to Flower Girls for sequential row-by-row animation
    const allNameRows = []
    let currentTime = 0
    
    // Parents section - collect rows
    if (parentsRef.current) {
      const groomParents = parentsRef.current.querySelectorAll('.flex-1:first-child p.font-poppins')
      const brideParents = parentsRef.current.querySelectorAll('.flex-1:last-child p.font-poppins')
      
      if (groomParents.length > 0 && brideParents.length > 0) {
        const maxLength = Math.max(groomParents.length, brideParents.length)
        gsap.set([...groomParents, ...brideParents], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomParents[i]) row.push(groomParents[i])
          if (brideParents[i]) row.push(brideParents[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Bestman and Maid of Honor - collect rows (right after Parents)
    if (bestmanRef.current && maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current.querySelectorAll('p.font-poppins')
      const maidOfHonorNames = maidOfHonorRef.current.querySelectorAll('p.font-poppins')
      
      if (bestmanNames.length > 0 || maidOfHonorNames.length > 0) {
        const maxLength = Math.max(bestmanNames.length, maidOfHonorNames.length)
        gsap.set([...bestmanNames, ...maidOfHonorNames], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (bestmanNames[i]) row.push(bestmanNames[i])
          if (maidOfHonorNames[i]) row.push(maidOfHonorNames[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Principal Sponsors - collect rows
    if (principalSponsorsRef.current) {
      const ninongElements = principalSponsorsRef.current?.querySelectorAll('.ninong-item')
      const ninangElements = principalSponsorsRef.current?.querySelectorAll('.ninang-item')
      
      if (ninongElements && ninangElements && ninongElements.length > 0) {
        const maxLength = Math.max(ninongElements.length, ninangElements.length)
        gsap.set([...ninongElements, ...ninangElements], { opacity: 0, y: 20 })
        
        // Collect paired rows
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (ninongElements[i]) row.push(ninongElements[i])
          if (ninangElements[i]) row.push(ninangElements[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
    }
    }

        // Collect unpaired ninangs
        const unpairedNinangs = principalSponsorsRef.current?.querySelectorAll('.mt-4 .ninang-item')
        if (unpairedNinangs && unpairedNinangs.length > 0) {
          gsap.set(unpairedNinangs, { opacity: 0, y: 20 })
          Array.from(unpairedNinangs).forEach(ninang => {
            allNameRows.push({ elements: [ninang], time: currentTime })
            currentTime += 0.1
      })
    }
      }
    }

    // Secondary Sponsors - collect Candle, Veil, Cord Sponsors (single column - one name per row)
    const sponsorRefs = [candleSponsorsRef, veilSponsorsRef, cordSponsorsRef].filter(ref => ref.current)
    sponsorRefs.forEach(ref => {
      const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })
    
    // Bible Bearer, Ring Bearer, Coin Bearer, Flower Boys - collect (single column - one name per row)
    const bearerRefs = [bibleBearerRef, ringBearerRef, coinBearerRef, flowerBoysRef].filter(ref => ref.current)
      bearerRefs.forEach(ref => {
        const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })
    
    // Groomsmen + Bridesmaids - collect rows
    if (secondarySponsorsRef.current) {
      const groomsmenElements = secondarySponsorsRef.current?.querySelectorAll('.groomsmen-item')
      const bridesmaidsElements = secondarySponsorsRef.current?.querySelectorAll('.bridesmaids-item')
      
      if (groomsmenElements && bridesmaidsElements && groomsmenElements.length > 0) {
        const maxLength = Math.max(groomsmenElements.length, bridesmaidsElements.length)
        gsap.set([...groomsmenElements, ...bridesmaidsElements], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomsmenElements[i]) row.push(groomsmenElements[i])
          if (bridesmaidsElements[i]) row.push(bridesmaidsElements[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Junior Flower Girls - collect (single column - one name per row)
    if (juniorFlowerGirlsRef.current) {
      const names = juniorFlowerGirlsRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
              })
      }
    }

    // Little Flower Girls - collect (single column - one name per row)
    if (littleFlowerGirlsRef.current) {
      const names = littleFlowerGirlsRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    // Here comes the bride - collect (single column - one name per row)
    if (hereComesTheBrideRef.current) {
      const names = hereComesTheBrideRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }
    
    // Animate all collected rows sequentially when any section comes into view
    if (allNameRows.length > 0 && parentsRef.current) {
        ScrollTrigger.create({
        trigger: parentsRef.current,
          start: "top 80%",
          onEnter: () => {
          const masterTl = gsap.timeline()
          allNameRows.forEach(({ elements, time }) => {
            masterTl.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            }, time)
            })
          },
          toggleActions: "play none none reverse"
        })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const officiatingMinister = entourage.entourageList.find(item => item.category === "Officiating Minister")
  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourage.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourage.entourageList.find(item => item.category === "Maid of Honor")
  const matron = entourage.entourageList.find(item => item.category === "Matron")
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const flowerBoys = entourage.entourageList.find(item => item.category === "Flower Boys")
  const hereComesTheBride = entourage.entourageList.find(item => item.category === "Here comes the bride")
  const veilSponsors = entourage.entourageList.find(item => item.category === "Veil Sponsors")
  const cordSponsors = entourage.entourageList.find(item => item.category === "Cord Sponsors")
  const candleSponsors = entourage.entourageList.find(item => item.category === "Candle Sponsors")
  const juniorFlowerGirls = entourage.entourageList.find(item => item.category === "Junior Flower Girls")
  const littleFlowerGirls = entourage.entourageList.find(item => item.category === "Little Flower Girls")
  const flowerGirls = entourage.entourageList.find(item => item.category === "Flower Girls")
  const littleBride = entourage.entourageList.find(item => item.category === "Little Bride")

  return (
    <section
      id="entourage"
      data-section="entourage"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/images/graphics/beige-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35
        }}
      ></div>
      
      {/* Flower Banner - Top */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/flower-banner-2.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div>
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              {/* ENTOURAGE */}
              <div className="caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl block leading-none uppercase" style={{ lineHeight: '0.8', color: themeConfig.text.burntOrange }}>
                ENTOURAGE
              </div>
            </h2>
          </div>

          {/* Officiating Minister */}
          {officiatingMinister && (
            <div className="mb-6 flex flex-col gap-2 justify-center items-center">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Officiating Minister</p>
              {officiatingMinister.names && officiatingMinister.names.map((name, index) => (
                <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                  {name}
                </p>
              ))}
            </div>
          )}

          {/* Couple Names */}
          <div className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Groom */}
            <div className="flex-1">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Groom</p>
              <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.couple.groom.name}</p>
            </div>

            {/* Bride */}
            <div className="flex-1">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Bride</p>
              <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.couple.bride.name}</p>
            </div>
          </div>

          {/* Parents Section */}
          <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Groom's Parents */}
            <div className="flex-1">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Groom's Parents</p>
              <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.parents.groom.father}</p>
              <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.parents.groom.mother}</p>
            </div>

            {/* Bride's Parents */}
            <div className="flex-1">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Bride's Parents</p>
              <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.parents.bride.father}</p>
              <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.parents.bride.mother}</p>
            </div>
          </div>

          {/* Principal Sponsors */}
          {principalSponsors && (() => {
            const ninongs = principalSponsors.ninong || []
            const ninangs = principalSponsors.ninang || []
            const pairedNinangs = ninangs.slice(0, ninongs.length)
            const unpairedNinangs = ninangs.slice(ninongs.length)
            
            return (
              <div ref={principalSponsorsRef} className="mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-6 text-center capitalize whitespace-nowrap" style={{ color: themeConfig.text.burntOrange }}>Principal Sponsors</h3>
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start">
                  {/* NINONG Column */}
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Ninong</p>
                    <div className="space-y-2">
                      {ninongs.map((name, index) => (
                        <p key={index} className="ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* NINANG Column - Paired */}
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Ninang</p>
                    <div className="space-y-2">
                      {pairedNinangs.map((name, index) => (
                        <p key={index} className="ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Unpaired NINANGs - Centered */}
                {unpairedNinangs.length > 0 && (
                  <div className="mt-4 flex justify-center">
                    <div className="space-y-2">
                      {unpairedNinangs.map((name, index) => (
                        <p key={`unpaired-${index}`} className="ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}

          {/* Bestman and Matron */}
          <div className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Bestman */}
            {bestman && (
              <div ref={bestmanRef} className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Bestman</p>
                {bestman.names && bestman.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-right">
                    {name}
                  </p>
                ))}
              </div>
            )}

            {/* Maid of Honor or Matron */}
            {(maidOfHonor || matron) && (
              <div ref={maidOfHonorRef} className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>
                  {matron ? "Matron" : "Maid Of Honor"}
                </p>
                {(matron || maidOfHonor)?.names && (matron || maidOfHonor).names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                    {name}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Candle Sponsors */}
          {candleSponsors && (
            <div className="mb-6">
              <div ref={candleSponsorsRef} className="flex flex-col gap-2 justify-center items-center">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To light our path / Candle</p>
                {candleSponsors.names && candleSponsors.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}

            {/* Veil Sponsors */}
            {veilSponsors && (
            <div className="mb-6">
                <div ref={veilSponsorsRef} className="flex flex-col gap-2 justify-center items-center">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To clothe us one / Veil</p>
                  {veilSponsors.names && veilSponsors.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Cord Sponsors */}
            {cordSponsors && (
            <div className="mb-6">
                <div ref={cordSponsorsRef} className="flex flex-col gap-2 justify-center items-center">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To bind us together / Cord</p>
                  {cordSponsors.names && cordSponsors.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}

          {/* Secondary Sponsors */}
          {secondarySponsors && (
            <div ref={secondarySponsorsRef} className="mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-6 text-center capitalize whitespace-nowrap" style={{ color: themeConfig.text.burntOrange }}>Secondary Sponsors</h3>

              <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start mb-6">
                {/* GROOMSMEN Column */}
                <div className="flex-1">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Groomsmen</p>
                  <div className="space-y-2">
                    {secondarySponsors.groomsmen && secondarySponsors.groomsmen.map((name, index) => (
                      <p key={index} className="groomsmen-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
                {/* BRIDESMAID Column */}
                <div className="flex-1">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Bridesmaids</p>
                  <div className="space-y-2">
                    {secondarySponsors.bridesmaid && secondarySponsors.bridesmaid.map((name, index) => (
                      <p key={index} className="bridesmaids-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ring Bearer, Bible Bearer, Coin Bearer, and Flower Boys */}
              {(bibleBearer || ringBearer || coinBearer || flowerBoys) && (
                <div className="mb-6">
                  <div className="flex flex-col gap-6 justify-center items-center mt-6">
                    {/* Ring Bearer */}
                    {ringBearer && (
                      <div ref={ringBearerRef}>
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To carry our symbol of love / Ring bearer</p>
                        {ringBearer.names && ringBearer.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Bible Bearer */}
                    {bibleBearer && (
                      <div ref={bibleBearerRef}>
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To carry our faith / Bible bearer</p>
                        {bibleBearer.names && bibleBearer.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Coin Bearer */}
                    {coinBearer && (
                      <div ref={coinBearerRef}>
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To carry our symbol of treasure / Coin</p>
                        {coinBearer.names && coinBearer.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Flower Boys */}
                    {flowerBoys && (
                      <div ref={flowerBoysRef}>
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Flower Boys</p>
                        {flowerBoys.names && flowerBoys.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Junior Flower Girls */}
          {juniorFlowerGirls && (
            <div className="mb-6">
              <div ref={juniorFlowerGirlsRef} className="flex flex-col gap-2 justify-center items-center mt-6">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Junior Flower Girls</p>
                {juniorFlowerGirls.names && juniorFlowerGirls.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Flower Girls */}
          {flowerGirls && (
            <div className="mb-6">
              <div className="flex flex-col gap-2 justify-center items-center mt-6">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>To shower our path / Flower girls</p>
                {flowerGirls.names && flowerGirls.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Little Flower Girls */}
          {littleFlowerGirls && (
            <div className="mb-6">
              <div ref={littleFlowerGirlsRef} className="flex flex-col gap-2 justify-center items-center mt-6">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Little Flower Girls</p>
                {littleFlowerGirls.names && littleFlowerGirls.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Little Bride */}
          {littleBride && (
            <div className="mb-6">
              <div className="flex flex-col gap-2 justify-center items-center mt-6">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Little Bride</p>
                {littleBride.names && littleBride.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Here comes the bride */}
          {hereComesTheBride && (
            <div className="mb-6">
              <div ref={hereComesTheBrideRef} className="flex flex-col gap-2 justify-center items-center mt-6">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Here comes the bride</p>
                {hereComesTheBride.names && hereComesTheBride.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Flower Banner - Bottom */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/flower-banner-2.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>
    </section>
  )
}

export default EntourageSection
